module.exports = {
  'disableEmoji': true,
  'list': [
    'feat',
    'fix',
    'docs',
    'style',
    'refactor',
    'perf',
    'test',
    'ci',
    'chore',
    'revert',
    'build'
  ],
  'maxMessageLength': 64,
  'minMessageLength': 3,
  'questions': [
    'type',
    'scope',
    'subject',
    'body',
    'breaking',
    'issues',
    'lerna'
  ],
  'scopes': [],
  'types': {
    'chore': {
      'description': '构建过程或辅助工具的变动',
      'emoji': '🤖',
      'value': 'chore'
    },
    'ci': {
      'description': 'CI相关的变动',
      'emoji': '🎡',
      'value': 'ci'
    },
    'docs': {
      'description': '变更的只有文档',
      'emoji': '✏️',
      'value': 'docs'
    },
    'feat': {
      'description': '一个新的特性',
      'emoji': '🎸',
      'value': 'feat'
    },
    'fix': {
      'description': '修复一个Bug',
      'emoji': '🐛',
      'value': 'fix'
    },
    'perf': {
      'description': '提升性能',
      'emoji': '⚡️',
      'value': 'perf'
    },
    'refactor': {
      'description': '重构代码，注意和feat、fix区分',
      'emoji': '💡',
      'value': 'refactor'
    },
    'build': {
      'description': '打包发布',
      'emoji': '🏹',
      'value': 'build'
    },
    'style': {
      'description': '样式：标记、空白、格式、缺少分号……',
      'emoji': '💄',
      'value': 'style'
    },
    'test': {
      'description': '添加一个测试',
      'emoji': '💍',
      'value': 'test'
    },
    'revert': {
      'description': '回退代码',
      'emoji': '💍',
      'value': 'revert'
    }
  }
};
