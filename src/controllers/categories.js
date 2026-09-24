 // Import any needed model functions
import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    addCategory,
    updateCategory
} from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};


// Display details for one category
const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    const title = 'Category Details';

    res.render('category', { title, category, projects });
};
// Display the create category form
const showNewCategory = (req, res) => {
    const title = 'Create New Category';

    res.render('new-category', { title });
};

// Process the create category form
const processNewCategory = async (req, res) => {
    const { name } = req.body;

    // Server-side validation
    if (!name || name.trim().length === 0) {
        req.flash('error', 'Category name is required.');
        return res.redirect('/new-category');
    }

    if (name.trim().length > 100) {
        req.flash('error', 'Category name cannot exceed 100 characters.');
        return res.redirect('/new-category');
    }

    if (name.trim().length < 3) {
        req.flash('error', 'Category name must be at least 3 characters.');
        return res.redirect('/new-category');
    }

    const result = await addCategory(name.trim());

    if (result) {
        req.flash('success', 'Category created successfully.');
        res.redirect('/categories');
    }
};

// Display the edit category form
const showEditCategory = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);

    if (!category) {
        req.flash('error', 'Category not found.');
        return res.redirect('/categories');
    }

    const title = 'Edit Category';

    res.render('edit-category', { title, category });
};

// Process the edit category form
const processEditCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;

    // Server-side validation
    if (!name || name.trim().length === 0) {
        req.flash('error', 'Category name is required.');
        return res.redirect(`/edit-category/${categoryId}`);
    }

    if (name.trim().length > 100) {
        req.flash('error', 'Category name cannot exceed 100 characters.');
        return res.redirect(`/edit-category/${categoryId}`);
    }

    if (name.trim().length < 3) {
        req.flash('error', 'Category name must be at least 3 characters.');
        return res.redirect(`/edit-category/${categoryId}`);
    }

    const result = await updateCategory(categoryId, name.trim());

    if (result) {
        req.flash('success', 'Category updated successfully.');
        res.redirect('/categories');
    }
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};


// Export any controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategory,
    processNewCategory,
    showEditCategory,
    processEditCategory
};