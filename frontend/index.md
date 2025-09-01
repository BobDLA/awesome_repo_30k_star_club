---
layout: default
title: GitHub Repository Analysis System
description: 分析GitHub仓库中的AI/LLM开发模式和特殊文件
---

<!-- Hero Section -->
<section class="hero-section">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <h1 class="display-4 fw-bold text-white">GitHub Repository Analysis</h1>
                <p class="lead text-white mb-4">
                    分析GitHub仓库中的AI/LLM开发模式，发现包含CLAUDE.md、Agents.md等特殊文件的高质量项目
                </p>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary btn-lg" onclick="scrollToSection('filters')">
                        <i class="fas fa-search"></i> 开始分析
                    </button>
                    <button class="btn btn-outline-light btn-lg" onclick="loadSampleData()">
                        <i class="fas fa-database"></i> 加载示例数据
                    </button>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="hero-stats">
                    <div class="row text-center">
                        <div class="col-4">
                            <div class="stat-item">
                                <div class="stat-number" id="totalRepos">864</div>
                                <div class="stat-label">总仓库数</div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="stat-item">
                                <div class="stat-number" id="claudeRepos">37</div>
                                <div class="stat-label">CLAUDE.md</div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="stat-item">
                                <div class="stat-number" id="agentsRepos">12</div>
                                <div class="stat-label">Agents.md</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Overview Section -->
<section id="overview" class="py-5">
    <div class="container">
        <h2 class="text-center mb-5">数据概览</h2>
        <div class="row">
            <div class="col-md-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-star fa-3x text-warning mb-3"></i>
                        <h5>高Star仓库</h5>
                        <p class="card-text">专注于Star数 > 30,000的优质GitHub项目</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-file-code fa-3x text-info mb-3"></i>
                        <h5>特殊文件检测</h5>
                        <p class="card-text">识别AI/LLM开发相关的配置文件</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-brain fa-3x text-success mb-3"></i>
                        <h5>AI开发模式</h5>
                        <p class="card-text">发现采用AI辅助开发的项目</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fas fa-filter fa-3x text-danger mb-3"></i>
                        <h5>多维度筛选</h5>
                        <p class="card-text">支持语言、Star数、特殊文件等筛选</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Filters Section -->
<section id="filters" class="py-5 bg-light">
    <div class="container">
        <h2 class="text-center mb-5">数据筛选</h2>
        
        <!-- Feature Filters -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <i class="fas fa-magic"></i> 特色功能筛选
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="hasClaudeMd">
                                    <label class="form-check-label" for="hasClaudeMd">
                                        <i class="fab fa-github"></i> 包含 CLAUDE.md 文件
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="hasAgentsMd">
                                    <label class="form-check-label" for="hasAgentsMd">
                                        <i class="fas fa-robot"></i> 包含 Agents.md 文件
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Basic Filters -->
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <i class="fas fa-code"></i> 编程语言
                        </h5>
                    </div>
                    <div class="card-body">
                        <select class="form-select" id="languageFilter">
                            <option value="">所有语言</option>
                            <option value="Python">Python</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="TypeScript">TypeScript</option>
                            <option value="Java">Java</option>
                            <option value="Go">Go</option>
                            <option value="Rust">Rust</option>
                            <option value="C++">C++</option>
                            <option value="Ruby">Ruby</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <i class="fas fa-star"></i> Star 数范围
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <input type="number" class="form-control" id="minStars" placeholder="最小Star数" value="30000">
                            </div>
                            <div class="col-6">
                                <input type="number" class="form-control" id="maxStars" placeholder="最大Star数">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <i class="fas fa-file"></i> 特殊文件
                        </h5>
                    </div>
                    <div class="card-body">
                        <select class="form-select" id="specialFileFilter">
                            <option value="">所有文件</option>
                            <option value="readme">README</option>
                            <option value="license">LICENSE</option>
                            <option value="contributing">CONTRIBUTING</option>
                            <option value="claude">CLAUDE.md</option>
                            <option value="agents">AGENTS.md</option>
                            <option value="cursor_rules">.cursor/rules/</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12 text-center">
                <button class="btn btn-primary btn-lg" onclick="applyFilters()">
                    <i class="fas fa-search"></i> 应用筛选
                </button>
                <button class="btn btn-outline-secondary btn-lg ms-2" onclick="resetFilters()">
                    <i class="fas fa-undo"></i> 重置筛选
                </button>
            </div>
        </div>
    </div>
</section>

<!-- Results Section -->
<section id="results" class="py-5">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>分析结果</h2>
                    <div class="d-flex align-items-center gap-3">
                        <span class="badge bg-primary" id="resultCount">显示 0 个结果</span>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-outline-primary active" onclick="setViewMode('grid')">
                                <i class="fas fa-th"></i>
                            </button>
                            <button type="button" class="btn btn-outline-primary" onclick="setViewMode('list')">
                                <i class="fas fa-list"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading Spinner -->
        <div id="loadingSpinner" class="text-center py-5" style="display: none;">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">加载中...</span>
            </div>
            <p class="mt-3">正在加载数据...</p>
        </div>

        <!-- Results Container -->
        <div id="resultsContainer" class="row">
            <!-- Results will be populated here -->
        </div>

        <!-- No Results -->
        <div id="noResults" class="text-center py-5" style="display: none;">
            <i class="fas fa-search fa-4x text-muted mb-3"></i>
            <h4>未找到匹配的结果</h4>
            <p class="text-muted">请尝试调整筛选条件</p>
        </div>
    </div>
</section>

<!-- About Section -->
<section id="about" class="py-5 bg-light">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h2 class="text-center mb-4">关于本项目</h2>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">项目简介</h5>
                        <p class="card-text">
                            GitHub Repository Analysis System 是一个专门用于分析GitHub仓库中AI/LLM开发模式的工具。
                            通过采集高Star仓库的数据，识别包含特殊配置文件的项目，帮助开发者发现优质的AI辅助开发实践。
                        </p>
                        
                        <h5 class="card-title mt-4">特色功能</h5>
                        <ul class="card-text">
                            <li><strong>CLAUDE.md 筛选</strong>：发现包含Claude AI指令配置的项目</li>
                            <li><strong>Agents.md 筛选</strong>：找到包含AI代理配置的项目</li>
                            <li><strong>多维度分析</strong>：支持语言、Star数、特殊文件等多维度筛选</li>
                            <li><strong>实时统计</strong>：提供详细的数据统计和可视化</li>
                        </ul>
                        
                        <h5 class="card-title mt-4">技术栈</h5>
                        <p class="card-text">
                            前端采用纯静态技术（HTML + CSS + JavaScript），可部署在GitHub Pages上。
                            后端数据采集使用Python，数据存储在SQLite数据库中。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>