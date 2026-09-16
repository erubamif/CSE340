// Import any needed model functions
import {
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';


// Number of upcoming projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;


// Display upcoming service projects
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};


// Display details for one service project
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const title = 'Service Project Details';

    res.render('project', { title, project });
};


// Export controller functions
export { showProjectsPage, showProjectDetailsPage };