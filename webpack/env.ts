const path = require('path');

const IS_DEV = process.env.NODE_ENV !== 'production';
const FRONTEND_DIR = path.join(__dirname, '../packages/frontend/src');
const BACKEND_DIR = path.join(__dirname, '../packages/backend');
const DIST_DIR = path.join(__dirname, '../dist');

module.exports = { IS_DEV, FRONTEND_DIR, BACKEND_DIR, DIST_DIR };
