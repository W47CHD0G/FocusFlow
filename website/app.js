// ============================================
// Sample Data
// ============================================

const sampleClasses = [
    { id: 1, name: 'Data Structures', time: '09:00 AM', location: 'Building A, Room 101' },
    { id: 2, name: 'Calculus II', time: '11:00 AM', location: 'Building B, Room 205' },
    { id: 3, name: 'Physics Lab', time: '02:00 PM', location: 'Building C, Lab 3' }
];

const sampleDueAssignments = [
    { id: 1, name: 'Midterm Exam - Physics', dueDate: 'Today, 5:00 PM' },
    { id: 2, name: 'Programming Project', dueDate: 'Tomorrow, 11:59 PM' },
    { id: 3, name: 'Lab Report', dueDate: 'In 2 days' }
];

const sampleAssignments = [
    {
        id: 1,
        course: 'Data Structures',
        title: 'Binary Search Tree Implementation',
        dueDate: '2026-06-15',
        weight: 25,
        priority: 'high',
        description: 'Implement BST with insert, delete, and search'
    },
    {
        id: 2,
        course: 'Calculus II',
        title: 'Integration Problem Set',
        dueDate: '2026-06-18',
        weight: 15,
        priority: 'medium',
        description: 'Complete exercises 1-30'
    },
    {
        id: 3,
        course: 'Physics',
        title: 'Midterm Exam',
        dueDate: '2026-06-12',
        weight: 30,
        priority: 'high',
        description: 'Chapters 1-5'
    },
    {
        id: 4,
        course: 'Literature',
        title: 'Essay: Modern Poetry',
        dueDate: '2026-06-20',
        weight: 10,
        priority: 'low',
        description: 'Analyze 3 contemporary poems'
    },
    {
        id: 5,
        course: 'Chemistry',
        title: 'Lab Report',
        dueDate: '2026-06-16',
        weight: 8,
        priority: 'low',
        description: 'Document acid-base titration results'
    }
];

const weekSchedule = {
    Monday: [
        { type: 'class', name: 'Data Structures', time: '09:00-10:30' },
        { type: 'study', name: 'BST Practice', time: '11:00-12:00' },
        { type: 'class', name: 'Calculus II', time: '01:00-02:30' },
        { type: 'break', name: 'Lunch Break', time: '12:00-01:00' }
    ],
    Tuesday: [
        { type: 'class', name: 'Physics Lab', time: '10:00-12:00' },
        { type: 'study', name: 'Lab Report Review', time: '02:00-03:00' },
        { type: 'break', name: 'Coffee Break', time: '12:00-12:30' }
    ],
    Wednesday: [
        { type: 'class', name: 'Data Structures', time: '09:00-10:30' },
        { type: 'study', name: 'Prepare for Exam', time: '11:00-01:00' },
        { type: 'class', name: 'Calculus II', time: '01:00-02:30' },
        { type: 'break', name: 'Dinner', time: '06:00-07:00' }
    ],
    Thursday: [
        { type: 'study', name: 'Problem Solving', time: '10:00-12:00' },
        { type: 'class', name: 'Chemistry Lecture', time: '02:00-03:30' },
        { type: 'break', name: 'Snack Break', time: '12:00-12:30' }
    ],
    Friday: [
        { type: 'class', name: 'Literature Class', time: '10:00-11:30' },
        { type: 'study', name: 'Essay Writing', time: '01:00-03:00' },
        { type: 'break', name: 'Weekend Prep', time: '03:00-04:00' }
    ],
    Saturday: [
        { type: 'study', name: 'Weekly Review', time: '10:00-12:00' },
        { type: 'study', name: 'Catch-up Work', time: '02:00-04:00' }
    ],
    Sunday: [
        { type: 'study', name: 'Weekly Planning', time: '07:00-08:00' }
    ]
};

// ============================================
// Academic Dashboard
// ============================================

function renderAcademicDashboard() {
    const container = document.getElementById('academic-dashboard');
    
    const html = `
        <div class="dashboard-content">
            <div class="dashboard-card">
                <h3>📚 Today's Classes</h3>
                ${sampleClasses.map(cls => `
                    <div class="class-item">
                        <strong>${cls.name}</strong>
                        <div class="class-time">⏰ ${cls.time} | 📍 ${cls.location}</div>
                    </div>
                `).join('')}
            </div>
            <div class="dashboard-card">
                <h3>📌 Upcoming Due Assignments</h3>
                ${sampleDueAssignments.map(due => `
                    <div class="due-item">
                        <strong>${due.name}</strong>
                        <div class="class-time">⏱️ ${due.dueDate}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// ============================================
// Assignment Tracker
// ============================================

function renderAssignmentTracker() {
    const container = document.getElementById('assignment-tracker');
    
    // Sort by weight (descending) then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const sorted = [...sampleAssignments].sort((a, b) => {
        if (b.weight !== a.weight) return b.weight - a.weight;
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    const html = `
        <div class="assignment-list">
            ${sorted.map(assignment => {
                const weightClass = assignment.weight >= 20 ? 'weight-high' : 
                                   assignment.weight >= 10 ? 'weight-medium' : 'weight-low';
                const priorityClass = `priority-${assignment.priority}`;
                
                return `
                    <div class="assignment-item">
                        <div class="priority-indicator ${priorityClass}"></div>
                        <div class="assignment-info">
                            <h4>${assignment.title}</h4>
                            <div class="assignment-meta">
                                <span>${assignment.course}</span>
                                <span>📅 ${assignment.dueDate}</span>
                            </div>
                        </div>
                        <span class="weight-badge ${weightClass}">${assignment.weight}% of grade</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    container.innerHTML = html;
}

// ============================================
// Pomodoro Timer
// ============================================

class PomodoroTimer {
    constructor() {
        this.workDuration = 25 * 60; // 25 minutes in seconds
        this.breakDuration = 5 * 60; // 5 minutes in seconds
        this.timeLeft = this.workDuration;
        this.isRunning = false;
        this.isWorkSession = true;
        this.sessionsCompleted = 0;
        this.intervalId = null;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.updateDisplay();
        
        this.intervalId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.sessionComplete();
            }
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.updateDisplay();
    }

    reset() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.timeLeft = this.isWorkSession ? this.workDuration : this.breakDuration;
        this.updateDisplay();
    }

    sessionComplete() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        
        if (this.isWorkSession) {
            this.sessionsCompleted++;
            this.isWorkSession = false;
            this.timeLeft = this.breakDuration;
            alert('🎉 Great work! Time for a break.');
        } else {
            this.isWorkSession = true;
            this.timeLeft = this.workDuration;
            alert('⏰ Break time over! Ready for another session?');
        }
        
        this.updateDisplay();
    }

    formatTime() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        const timerDisplay = document.querySelector('.timer-display');
        const timerLabel = document.querySelector('.timer-label');
        const startBtn = document.querySelector('.btn-start');
        const pauseBtn = document.querySelector('.btn-pause');
        const sessionsCount = document.querySelector('.sessions-count');
        
        if (timerDisplay) timerDisplay.textContent = this.formatTime();
        if (timerLabel) timerLabel.textContent = this.isWorkSession ? '🎯 Focus Time' : '☕ Break Time';
        if (sessionsCount) sessionsCount.textContent = this.sessionsCompleted;
        
        if (startBtn) {
            startBtn.disabled = this.isRunning;
            startBtn.style.opacity = this.isRunning ? '0.5' : '1';
        }
        if (pauseBtn) {
            pauseBtn.disabled = !this.isRunning;
            pauseBtn.style.opacity = !this.isRunning ? '0.5' : '1';
        }
    }
}

let pomodoroTimer = new PomodoroTimer();

function renderPomodoroTimer() {
    const container = document.getElementById('pomodoro-timer');
    
    const html = `
        <div class="pomodoro-content">
            <div class="timer-label">🎯 Focus Time</div>
            <div class="timer-display">25:00</div>
            <div class="timer-controls">
                <button class="timer-btn btn-start" onclick="pomodoroTimer.start()">▶ Start</button>
                <button class="timer-btn btn-pause" onclick="pomodoroTimer.pause()" disabled>⏸ Pause</button>
                <button class="timer-btn btn-reset" onclick="pomodoroTimer.reset()">🔄 Reset</button>
            </div>
            <div class="session-info">
                <div class="session-stat">
                    <div class="session-stat-value">25</div>
                    <div class="session-stat-label">Min / Session</div>
                </div>
                <div class="session-stat">
                    <div class="session-stat-value">5</div>
                    <div class="session-stat-label">Min / Break</div>
                </div>
                <div class="session-stat">
                    <div class="session-stat-value sessions-count">0</div>
                    <div class="session-stat-label">Sessions Done</div>
                </div>
            </div>
            <p style="text-align: center; color: #94a3b8; margin-top: 1rem;">
                💡 Pro Tip: Complete 4 Pomodoro sessions for a longer 15-30 minute break!
            </p>
        </div>
    `;
    
    container.innerHTML = html;
    pomodoroTimer.updateDisplay();
}

// ============================================
// Time-Blocking Calendar
// ============================================

function renderCalendar() {
    const container = document.getElementById('calendar-view');
    const days = Object.keys(weekSchedule);
    
    let html = `<div class="calendar-content">`;
    html += `<div class="days-grid">`;
    
    // Day headers
    days.forEach(day => {
        html += `<div class="day-header">${day}</div>`;
    });
    
    // Day columns with schedules
    days.forEach(day => {
        html += `<div class="day-column">`;
        
        const schedule = weekSchedule[day];
        schedule.forEach(item => {
            let blockClass = '';
            let blockEmoji = '';
            
            if (item.type === 'class') {
                blockClass = 'class-block';
                blockEmoji = '📚';
            } else if (item.type === 'study') {
                blockClass = 'study-block';
                blockEmoji = '📖';
            } else {
                blockClass = 'break-block';
                blockEmoji = '☕';
            }
            
            html += `
                <div class="${blockClass}">
                    <div class="class-title">${blockEmoji} ${item.name}</div>
                    <div class="time-slot">${item.time}</div>
                </div>
            `;
        });
        
        html += `</div>`;
    });
    
    html += `</div>`;
    
    // Legend
    html += `
        <div class="calendar-legend">
            <div class="legend-item">
                <div class="legend-color legend-class"></div>
                <span>Classes</span>
            </div>
            <div class="legend-item">
                <div class="legend-color legend-study"></div>
                <span>Study Sessions</span>
            </div>
            <div class="legend-item">
                <div class="legend-color legend-break"></div>
                <span>Breaks</span>
            </div>
        </div>
    `;
    
    html += `</div>`;
    
    container.innerHTML = html;
}

// ============================================
// Initialize All Components
// ============================================

function initializeApp() {
    renderAcademicDashboard();
    renderAssignmentTracker();
    renderPomodoroTimer();
    renderCalendar();
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
