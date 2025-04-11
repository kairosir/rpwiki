module.exports = {
  roles: {
    user: {
      name: 'user',
      description: 'Обычный пользователь',
      permissions: {
        'api::article.article': {
          controllers: {
            article: {
              find: true,
              findOne: true
            }
          }
        },
        'api::category.category': {
          controllers: {
            category: {
              find: true,
              findOne: true
            }
          }
        },
        'api::tag.tag': {
          controllers: {
            tag: {
              find: true,
              findOne: true
            }
          }
        }
      }
    },
    moderator: {
      name: 'moderator',
      description: 'Модератор',
      permissions: {
        'api::article.article': {
          controllers: {
            article: {
              find: true,
              findOne: true,
              create: true,
              update: true,
              delete: true
            }
          }
        },
        'api::category.category': {
          controllers: {
            category: {
              find: true,
              findOne: true,
              create: true,
              update: true,
              delete: true
            }
          }
        },
        'api::tag.tag': {
          controllers: {
            tag: {
              find: true,
              findOne: true,
              create: true,
              update: true,
              delete: true
            }
          }
        }
      }
    },
    admin: {
      name: 'admin',
      description: 'Администратор',
      permissions: {
        'api::article.article': {
          controllers: {
            article: {
              find: true,
              findOne: true,
              create: true,
              update: true,
              delete: true
            }
          }
        },
        'api::category.category': {
          controllers: {
            category: {
              find: true,
              findOne: true,
              create: true,
              update: true,
              delete: true
            }
          }
        },
        'api::tag.tag': {
          controllers: {
            tag: {
              find: true,
              findOne: true,
              create: true,
              update: true,
              delete: true
            }
          }
        },
        'api::advertisement.advertisement': {
          controllers: {
            advertisement: {
              find: true,
              findOne: true,
              create: true,
              update: true,
              delete: true
            }
          }
        }
      }
    }
  }
}; 