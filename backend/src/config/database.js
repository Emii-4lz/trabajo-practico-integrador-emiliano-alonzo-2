import { Sequelize } from "sequelize";

const sequelize = new Sequelize('blog_personal', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

export default sequelize;