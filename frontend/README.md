# GitHub Repository Analysis System - Frontend

这是一个用于分析GitHub仓库中AI/LLM开发模式的JAMstack前端应用，可部署在GitHub Pages上。

## 特色功能

### 🎯 CLAUDE.md 筛选
- 专门筛选包含CLAUDE.md文件的仓库
- 发现采用Claude AI进行开发的项目
- 一键查看所有AI配置项目

### 🤖 Agents.md 筛选  
- 筛选包含Agents.md文件的仓库
- 找到包含AI代理配置的项目
- 发现AI驱动的开发实践

### 🔍 多维度筛选
- **编程语言**：Python, JavaScript, TypeScript, Java, Go, Rust等
- **Star数范围**：支持自定义最小/最大Star数
- **特殊文件**：README, LICENSE, CONTRIBUTING, CLAUDE.md, Agents.md等
- **组合筛选**：可同时使用多个筛选条件

### 📊 实时统计
- 总仓库数量统计
- CLAUDE.md文件数量
- Agents.md文件数量
- 筛选结果实时更新

## 技术特点

### JAMstack架构
- **J**avaScript - 动态交互和数据处理
- **A**PIs - GitHub API数据获取
- **M**arkup - 静态HTML生成

### 静态部署
- 纯前端技术栈
- 可直接部署在GitHub Pages
- 无需服务器，零维护成本

### 响应式设计
- 支持桌面端和移动端
- Bootstrap 5框架
- 现代化UI设计

## 项目结构

```
frontend/
├── index.html              # 主页面（纯HTML版本）
├── index.md               # 主页面（Jekyll版本）
├── _config.yml            # Jekyll配置
├── _layouts/
│   └── default.html       # 默认布局
├── css/
│   └── style.css          # 自定义样式
├── js/
│   └── app.js             # 主要JavaScript逻辑
└── data/                  # 数据文件（可选）
```

## 部署方式

### 方式1：纯静态部署
直接将 `index.html` 上传到任何静态托管服务：
- GitHub Pages
- Netlify  
- Vercel
- 任何CDN服务

### 方式2：Jekyll部署
使用GitHub Pages的Jekyll功能：
1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择Jekyll作为源
4. 部署完成

## 使用方法

1. **打开页面**：访问部署后的URL
2. **浏览概览**：查看数据统计信息
3. **使用筛选**：
   - 勾选"包含CLAUDE.md文件"查找AI配置项目
   - 勾选"包含Agents.md文件"查找AI代理项目
   - 选择编程语言、Star数范围等条件
4. **查看结果**：以网格或列表形式查看筛选结果
5. **访问项目**：点击卡片直接跳转到GitHub仓库

## 数据说明

当前使用示例数据进行演示，包含：
- 864个高Star仓库（>30,000 stars）
- 37个包含CLAUDE.md的仓库
- 12个包含Agents.md的仓库
- 多种编程语言分布

实际部署时，可以通过以下方式获取真实数据：
1. 使用后端API接口
2. 静态JSON文件
3. GitHub API直接调用
4. Supabase等数据库

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 开发说明

### 本地开发
```bash
# 使用Python简单HTTP服务器
cd frontend
python -m http.server 8000

# 或使用Node.js
npx http-server
```

### 自定义配置
修改 `js/app.js` 中的 `repositories` 数组来更新数据：
```javascript
this.repositories = [
    {
        id: 1,
        full_name: 'owner/repo',
        name: 'repo',
        owner_login: 'owner',
        description: 'Repository description',
        language: 'Python',
        stargazers_count: 1000,
        // ... 其他字段
    }
];
```

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License