// GitHub Star Rankings - Main JavaScript with Sample Data Support

class GitHubStarRankings {
    constructor() {
        this.supabase = null;
        this.repositories = [];
        this.filteredRepos = [];
        this.currentFilters = {
            language: '',
            minStars: 30000,
            maxStars: 250000,
            searchQuery: '',
            hasClaudeMd: false,
            hasAgentsMd: false,
            hasReadme: false,
            hasLicense: false
        };
        this.sortOrder = 'desc';
        this.currentPage = 0;
        this.pageSize = 20;
        this.loading = false;
        this.useSampleData = true; // Always use sample data for reliable filtering
        
        // Available programming languages
        this.availableLanguages = [
            'Python', 'JavaScript', 'TypeScript', 'Java', 'Go', 'Rust', 'C++', 'Ruby',
            'PHP', 'Swift', 'Kotlin', 'C#', 'Shell', 'HTML', 'CSS', 'Other'
        ];
        
        this.init();
    }

    init() {
        this.initSupabase();
        this.bindEvents();
        this.loadLanguageButtons();
        this.loadData();
    }

    initSupabase() {
        // Try to initialize Supabase client
        try {
            if (typeof window.supabase !== 'undefined') {
                this.supabase = window.supabase.createClient(
                    'https://gslwwmtgmqogaylbjsll.supabase.co',
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzbHd3bXRnbXFvZ2F5bGJqc2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MzUyMDUsImV4cCI6MjA3MjMxMTIwNX0.GRJgTalU_yWLpIfFsit3XMlBdPoCzazc_v-EY-K-rD0'
                );
                this.useSampleData = false;
            } else {
                this.useSampleData = true;
            }
        } catch (error) {
            console.error('Supabase initialization failed:', error);
            this.useSampleData = true;
        }
    }

    bindEvents() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', this.debounce(() => {
            this.performSearch();
        }, 300));

        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Filter events
        document.getElementById('minStars').addEventListener('input', () => this.updateStarRange());
        document.getElementById('maxStars').addEventListener('input', () => this.updateStarRange());
        document.getElementById('hasClaudeMd').addEventListener('change', () => this.applyFilters());
        document.getElementById('hasAgentsMd').addEventListener('change', () => this.applyFilters());
        document.getElementById('hasReadme').addEventListener('change', () => this.applyFilters());
        document.getElementById('hasLicense').addEventListener('change', () => this.applyFilters());
    }

    loadLanguageButtons() {
        const container = document.getElementById('languageButtons');
        container.innerHTML = '';

        // Add "All Languages" button
        const allBtn = this.createLanguageButton('All', '', true);
        container.appendChild(allBtn);

        // Add language buttons
        this.availableLanguages.forEach(lang => {
            const btn = this.createLanguageButton(lang, lang, false);
            container.appendChild(btn);
        });
    }

    createLanguageButton(label, value, isActive) {
        const col = document.createElement('div');
        col.className = 'col-auto mb-2';
        
        const btn = document.createElement('button');
        btn.className = `btn ${isActive ? 'btn-primary' : 'btn-outline-primary'} btn-sm`;
        btn.textContent = label;
        btn.onclick = () => this.selectLanguage(value, btn);
        
        col.appendChild(btn);
        return col;
    }

    selectLanguage(language, button) {
        // Update button states
        document.querySelectorAll('#languageButtons .btn').forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline-primary');
        });
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-primary');

        // Update filter
        this.currentFilters.language = language;
        this.applyFilters();
    }

    updateStarRange() {
        const minStars = document.getElementById('minStars').value;
        const maxStars = document.getElementById('maxStars').value;
        
        document.getElementById('minStarsValue').textContent = minStars === '250000' ? '250K+' : this.formatStars(minStars);
        document.getElementById('maxStarsValue').textContent = maxStars === '250000' ? '250K+' : this.formatStars(maxStars);
        
        this.currentFilters.minStars = parseInt(minStars);
        this.currentFilters.maxStars = parseInt(maxStars);
        
        this.applyFilters();
    }

    async loadData() {
        this.showLoading(true);
        
        // Try to load from Supabase first, fall back to sample data
        if (this.supabase && !this.useSampleData) {
            try {
                await this.loadSupabaseData();
            } catch (error) {
                console.error('Failed to load from Supabase:', error);
                await this.loadSampleData();
            }
        } else {
            await this.loadSampleData();
        }
        
        this.showLoading(false);
        this.applyFilters();
    }

    async loadSampleData() {
        try {
            const response = await fetch('data/sample_data.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            this.repositories = data;
            this.updateHeroStats();
            
        } catch (error) {
            console.error('Sample data load failed:', error);
            this.repositories = this.getHardcodedSampleData();
            this.updateHeroStats();
        }
    }

    getHardcodedSampleData() {
        // Minimal fallback data when sample data loading fails
        return [
            {
                id: 1,
                full_name: 'microsoft/vscode',
                name: 'vscode',
                owner_login: 'microsoft',
                description: 'Visual Studio Code',
                language: 'TypeScript',
                stargazers_count: 150000,
                forks_count: 25000,
                created_at: '2015-04-29',
                updated_at: '2024-01-01',
                special_files: [
                    { file_type: 'readme', filename: 'README.md', is_active: true },
                    { file_type: 'license', filename: 'LICENSE', is_active: true }
                ]
            }
        ];
    }

    async loadSupabaseData() {
        const { data, error } = await this.supabase
            .from('repositories')
            .select('*')
            .order('stargazers_count', { ascending: false });

        if (error) {
            throw error;
        }

        this.repositories = data || [];
        
        // Load special files
        await this.loadSpecialFiles();
        
        // Update hero stats
        this.updateHeroStats();
    }

    async loadSpecialFiles() {
        const { data, error } = await this.supabase
            .from('special_files')
            .select('*');

        if (error) {
            console.error('Error loading special files:', error);
            return;
        }

        // Group special files by repository
        const specialFilesMap = {};
        data.forEach(file => {
            if (!specialFilesMap[file.repository_id]) {
                specialFilesMap[file.repository_id] = [];
            }
            specialFilesMap[file.repository_id].push(file);
        });

        // Add special files to repositories
        this.repositories.forEach(repo => {
            repo.special_files = specialFilesMap[repo.id] || [];
        });
    }

    updateHeroStats() {
        const totalRepos = this.repositories.length;
        const avgStars = Math.round(this.repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0) / totalRepos);
        const topStars = Math.max(...this.repositories.map(repo => repo.stargazers_count));

        document.getElementById('totalRepos').textContent = totalRepos.toLocaleString();
        document.getElementById('avgStars').textContent = this.formatStars(avgStars);
        document.getElementById('topStars').textContent = this.formatStars(topStars);
        
        // Update collection date
        const collectionDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('collectionDate').textContent = collectionDate;
    }

    applyFilters() {
        // Update filter states from UI
        this.currentFilters.hasClaudeMd = document.getElementById('hasClaudeMd').checked;
        this.currentFilters.hasAgentsMd = document.getElementById('hasAgentsMd').checked;
        this.currentFilters.hasReadme = document.getElementById('hasReadme').checked;
        this.currentFilters.hasLicense = document.getElementById('hasLicense').checked;
        
        this.filteredRepos = this.repositories.filter(repo => {
            // Language filter
            if (this.currentFilters.language && repo.language !== this.currentFilters.language) {
                return false;
            }

            // Star range filter
            if (repo.stargazers_count < this.currentFilters.minStars || 
                repo.stargazers_count > this.currentFilters.maxStars) {
                return false;
            }

            // Search filter
            if (this.currentFilters.searchQuery) {
                const query = this.currentFilters.searchQuery.toLowerCase();
                const searchableText = [
                    repo.full_name,
                    repo.name,
                    repo.owner_login,
                    repo.description,
                    repo.language
                ].filter(Boolean).join(' ').toLowerCase();
                
                if (!searchableText.includes(query)) {
                    return false;
                }
            }

            // Special file filters
            if (this.currentFilters.hasClaudeMd) {
                const hasClaudeMd = repo.special_files?.some(file => 
                    (file.file_type === 'claude' || file.file_type === 'claude_md') && file.is_active
                );
                if (!hasClaudeMd) return false;
            }

            if (this.currentFilters.hasAgentsMd) {
                const hasAgentsMd = repo.special_files?.some(file => 
                    (file.file_type === 'agents' || file.file_type === 'agents_md') && file.is_active
                );
                if (!hasAgentsMd) return false;
            }

            if (this.currentFilters.hasReadme) {
                const hasReadme = repo.special_files?.some(file => 
                    file.file_type === 'readme' && file.is_active
                );
                if (!hasReadme) return false;
            }

            if (this.currentFilters.hasLicense) {
                const hasLicense = repo.special_files?.some(file => 
                    file.file_type === 'license' && file.is_active
                );
                if (!hasLicense) return false;
            }

            return true;
        });

        // Sort results
        this.filteredRepos.sort((a, b) => {
            return this.sortOrder === 'desc' 
                ? b.stargazers_count - a.stargazers_count
                : a.stargazers_count - b.stargazers_count;
        });

        this.currentPage = 0;
        this.renderResults();
    }

    renderResults() {
        const container = document.getElementById('rankingsContainer');
        const noResults = document.getElementById('noResults');
        const loadMoreBtn = document.getElementById('loadMoreBtn');

        if (this.filteredRepos.length === 0) {
            container.innerHTML = '';
            noResults.style.display = 'block';
            loadMoreBtn.style.display = 'none';
            this.updateResultCount(0);
            return;
        }

        noResults.style.display = 'none';
        this.updateResultCount(this.filteredRepos.length);

        const startIdx = 0;
        const endIdx = startIdx + (this.currentPage + 1) * this.pageSize;
        const pageRepos = this.filteredRepos.slice(startIdx, endIdx);

        container.innerHTML = '';
        pageRepos.forEach((repo, index) => {
            const rank = startIdx + index + 1;
            const card = this.createRepositoryCard(repo, rank);
            container.appendChild(card);
        });

        // Show/hide load more button
        if (endIdx >= this.filteredRepos.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    createRepositoryCard(repo, rank) {
        const col = document.createElement('div');
        col.className = 'col-12 mb-3';
        
        const card = document.createElement('div');
        card.className = `card ranking-card ${rank <= 3 ? `top-${rank}` : ''}`;
        
        const specialFilesBadges = this.createSpecialFilesBadges(repo.special_files || []);
        
        card.innerHTML = `
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-auto">
                        <div class="rank-badge ${rank <= 3 ? `top-${rank} top-rank` : ''}">
                            #${rank}
                        </div>
                    </div>
                    <div class="col">
                        <h5 class="card-title mb-1">
                            <a href="https://github.com/${repo.full_name}" target="_blank" 
                               class="text-decoration-none text-dark">
                                ${repo.full_name}
                            </a>
                        </h5>
                        <p class="card-text text-muted small mb-2">
                            ${repo.description || 'No description available'}
                        </p>
                        <div class="d-flex align-items-center flex-wrap">
                            <div class="repo-stats">
                                <span class="stat-item">
                                    <i class="fas fa-star text-warning"></i>
                                    <strong>${this.formatStars(repo.stargazers_count)}</strong>
                                </span>
                                <span class="stat-item">
                                    <i class="fas fa-code-branch text-info"></i>
                                    <strong>${this.formatNumber(repo.forks_count)}</strong>
                                </span>
                                ${repo.language ? `
                                    <span class="stat-item">
                                        <span class="badge bg-language">${repo.language}</span>
                                    </span>
                                ` : ''}
                            </div>
                            ${specialFilesBadges}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        col.appendChild(card);
        return col;
    }

    createSpecialFilesBadges(specialFiles) {
        const badges = [];
        
        const fileTypes = {
            'claude': { label: 'CLAUDE.md', class: 'bg-claude' },
            'claude_md': { label: 'CLAUDE.md', class: 'bg-claude' },
            'agents': { label: 'Agents.md', class: 'bg-agents' },
            'agents_md': { label: 'Agents.md', class: 'bg-agents' },
            'readme': { label: 'README', class: 'bg-readme' },
            'license': { label: 'LICENSE', class: 'bg-license' }
        };

        // Use a Set to avoid duplicate badges
        const addedTypes = new Set();
        
        Object.entries(fileTypes).forEach(([type, config]) => {
            const hasFile = specialFiles.some(file => file.file_type === type && file.is_active);
            if (hasFile && !addedTypes.has(config.label)) {
                badges.push(`<span class="badge ${config.class}">${config.label}</span>`);
                addedTypes.add(config.label);
            }
        });

        return badges.length > 0 
            ? `<div class="special-badges">${badges.join('')}</div>`
            : '';
    }

    performSearch() {
        const query = document.getElementById('searchInput').value;
        this.currentFilters.searchQuery = query;
        this.applyFilters();
    }

    updateResultCount(count) {
        const resultCount = document.getElementById('resultCount');
        resultCount.textContent = `Showing ${count} repositories`;
    }

    setSortOrder(order) {
        this.sortOrder = order;
        
        // Update button states
        document.querySelectorAll('.btn-group .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.applyFilters();
    }

    loadMore() {
        this.currentPage++;
        this.renderResults();
    }

    showLoading(show) {
        const spinner = document.getElementById('loadingSpinner');
        spinner.style.display = show ? 'block' : 'none';
    }

    formatStars(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    formatNumber(num) {
        return num.toLocaleString();
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Global functions for HTML onclick handlers
let rankingsApp;

function loadData() {
    if (rankingsApp) {
        rankingsApp.loadData();
    }
}

function performSearch() {
    if (rankingsApp) {
        rankingsApp.performSearch();
    }
}

function updateStarRange() {
    if (rankingsApp) {
        rankingsApp.updateStarRange();
    }
}

function applyFilters() {
    if (rankingsApp) {
        rankingsApp.applyFilters();
    }
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('minStars').value = 30000;
    document.getElementById('maxStars').value = 250000;
    document.getElementById('hasClaudeMd').checked = false;
    document.getElementById('hasAgentsMd').checked = false;
    document.getElementById('hasReadme').checked = false;
    document.getElementById('hasLicense').checked = false;
    
    if (rankingsApp) {
        rankingsApp.currentFilters = {
            language: '',
            minStars: 30000,
            maxStars: 250000,
            searchQuery: '',
            hasClaudeMd: false,
            hasAgentsMd: false,
            hasReadme: false,
            hasLicense: false
        };
        rankingsApp.updateStarRange();
        rankingsApp.applyFilters();
    }
}

function setSortOrder(order) {
    if (rankingsApp) {
        rankingsApp.setSortOrder(order);
    }
}

function loadMore() {
    if (rankingsApp) {
        rankingsApp.loadMore();
    }
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    rankingsApp = new GitHubStarRankings();
});