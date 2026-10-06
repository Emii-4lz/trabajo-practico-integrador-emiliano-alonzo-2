import { User } from './user.model.js';
import { Profile } from './profile.model.js';
import { Article } from './article.model.js';
import { Tag } from './tag.model.js';
import { ArticleTag } from './article_tag.model.js';

User.hasOne(Profile, { foreignKey: 'user_id', as: 'profile', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Article, { foreignKey: 'user_id', as: 'articles', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Article.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Article.belongsToMany(Tag, { through: ArticleTag, as: 'tags', foreignKey: 'article_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Tag.belongsToMany(Article, { through: ArticleTag, as: 'articles', foreignKey: 'tag_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Tag.hasMany(ArticleTag, { foreignKey: 'tag_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ArticleTag.belongsTo(Tag, { foreignKey: 'tag_id' });

export { User, Profile, Article, Tag, ArticleTag };