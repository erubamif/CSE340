import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/projects', showProjectsPage);

router.get('/categories', showCategoriesPage);

// Detail pages
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get('/category/:id', showCategoryDetailsPage);

// New organization page
router.get('/new-organization', showNewOrganizationForm);

// Process new organization form
router.post('/new-organization', processNewOrganizationForm);

// Error-handling routes
router.get('/test-error', testErrorPage);

// Route to handle new organization form submission
router.post('/new-organization', processNewOrganizationForm);

export default router;
