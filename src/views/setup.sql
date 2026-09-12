CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_category (
    project_id INTEGER NOT NULL REFERENCES project(project_id),
    category_id INTEGER NOT NULL REFERENCES category(category_id),
    PRIMARY KEY (project_id, category_id)
);


-- ---------------------------------------------------------
-- organization
-- ---------------------------------------------------------
INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
('Green Future Initiative', 'A nonprofit focused on reforestation and urban greening projects across West Africa.', 'contact@greenfuture.org', 'green_future_logo.png'),
('CodeForGood Collective', 'A volunteer network of developers building open-source tools for local communities.', 'hello@codeforgood.org', 'codeforgood_logo.png'),
('Lagos Youth Empowerment Trust', 'Supports skills-training and mentorship programs for young people in Lagos State.', 'info@lagosyet.org', 'lyet_logo.png');

-- ---------------------------------------------------------
-- category
-- ---------------------------------------------------------
INSERT INTO category (name) VALUES
('Environment'),
('Education'),
('Technology'),
('Community Outreach'),
('Health');

-- ---------------------------------------------------------
-- project
-- (organization_id values below assume the three organizations
--  above were inserted first and received ids 1, 2, 3)
-- ---------------------------------------------------------
INSERT INTO project (organization_id, title, description, location, project_date) VALUES
(1, 'Mangrove Restoration Drive', 'Community-led planting of mangrove saplings along the Lagos coastline to combat erosion.', 'Lagos, Nigeria', '2025-03-15'),
(1, 'Schoolyard Greening Project', 'Installing gardens and shade trees in five public primary schools.', 'Ibadan, Nigeria', '2025-06-01'),
(2, 'Open Health Records App', 'Building an offline-first records app for rural clinics with limited connectivity.', 'Abuja, Nigeria', '2025-08-10'),
(2, 'Community Wi-Fi Mesh Build', 'Deploying a low-cost mesh network to bring internet access to an underserved neighborhood.', 'Ilorin, Nigeria', '2025-09-20'),
(3, 'Digital Skills Bootcamp', 'A 6-week intensive training program in web development for unemployed youth.', 'Lagos, Nigeria', '2025-04-05'),
(3, 'Mentorship & Career Fair', 'Connecting 200 young job-seekers with mentors and local employers.', 'Lagos, Nigeria', '2025-11-12');

-- ---------------------------------------------------------
-- project_category
-- (project_id / category_id values assume the inserts above
--  produced ids 1-6 for projects and 1-5 for categories, in order)
-- ---------------------------------------------------------
INSERT INTO project_category (project_id, category_id) VALUES
(1, 1),  -- Mangrove Restoration Drive -> Environment
(2, 1),  -- Schoolyard Greening Project -> Environment
(2, 2),  -- Schoolyard Greening Project -> Education
(3, 3),  -- Open Health Records App -> Technology
(3, 5),  -- Open Health Records App -> Health
(4, 3),  -- Community Wi-Fi Mesh Build -> Technology
(4, 4),  -- Community Wi-Fi Mesh Build -> Community Outreach
(5, 2),  -- Digital Skills Bootcamp -> Education
(5, 3),  -- Digital Skills Bootcamp -> Technology
(6, 2),  -- Mentorship & Career Fair -> Education
(6, 4);  -- Mentorship & Career Fair -> Community Outreach