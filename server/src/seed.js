require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');
const ActivityLog = require('./models/ActivityLog');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devpulse';
    console.log(`🌱 Connecting to MongoDB: ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('🧹 Clearing existing database collections...');
    await User.deleteMany({});
    await Task.deleteMany({});
    await ActivityLog.deleteMany({});

    console.log('👤 Seeding default users...');
    const demoUser = await User.create({
      name: 'StartupMeu Reviewer',
      email: 'demo@devpulse.io',
      password: 'Password123!',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
    });

    const devUser = await User.create({
      name: 'Mani Deep',
      email: 'manideep@devpulse.io',
      password: 'Password123!',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'
    });

    console.log(`✅ Users created: ${demoUser.email} (Admin), ${devUser.email} (Developer)`);

    console.log('📋 Seeding Agile Kanban tasks...');
    const now = new Date();
    const futureDate = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const pastDate = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const tasksData = [
      // To Do Column
      {
        title: 'Architect Webhook Ingestion Engine',
        description: 'Design idempotent event receiver and retry queues for third-party billing webhooks.',
        status: 'todo',
        priority: 'urgent',
        tags: ['Architecture', 'Backend', 'Payments'],
        dueDate: futureDate(3),
        assignee: 'Mani Deep',
        order: 0,
        creator: demoUser._id
      },
      {
        title: 'Setup Redis Caching for Project Metas',
        description: 'Implement cache layer around frequent workspace status queries to maintain <15ms latency.',
        status: 'todo',
        priority: 'medium',
        tags: ['Performance', 'Redis'],
        dueDate: futureDate(7),
        assignee: 'Unassigned',
        order: 1,
        creator: devUser._id
      },
      {
        title: 'Export Board Tasks to CSV/Markdown',
        description: 'Allow team leads to export current sprint board state into formatted summary reports.',
        status: 'todo',
        priority: 'low',
        tags: ['Feature', 'Reporting'],
        dueDate: futureDate(10),
        assignee: 'StartupMeu Reviewer',
        order: 2,
        creator: demoUser._id
      },

      // In Progress Column
      {
        title: 'Refactor Drag-and-Drop State Sync',
        description: 'Implement optimistic local updates with smooth animation and resilient rollback on API disconnects.',
        status: 'in_progress',
        priority: 'high',
        tags: ['Frontend', 'UI/UX', 'React'],
        dueDate: futureDate(2),
        assignee: 'Mani Deep',
        order: 0,
        creator: devUser._id
      },
      {
        title: 'Centralize Token Refresh Interceptors',
        description: 'Catch 401s and coordinate seamless session recovery with Axios client-side interceptors.',
        status: 'in_progress',
        priority: 'urgent',
        tags: ['Security', 'Auth'],
        dueDate: futureDate(1),
        assignee: 'StartupMeu Reviewer',
        order: 1,
        creator: demoUser._id
      },

      // In Review Column
      {
        title: 'Mongoose Compound Indexes Optimization',
        description: 'Add composite indexes on (status, order) and (creator, createdAt) to optimize search and board loads.',
        status: 'in_review',
        priority: 'high',
        tags: ['Database', 'MongoDB'],
        dueDate: futureDate(4),
        assignee: 'Mani Deep',
        order: 0,
        creator: devUser._id
      },
      {
        title: 'Accessibility & Keyboard Shortcuts Audit',
        description: 'Ensure all modal dialogs, status tags, and cards support full keyboard navigation (WCAG AA).',
        status: 'in_review',
        priority: 'medium',
        tags: ['A11y', 'Frontend'],
        dueDate: futureDate(5),
        assignee: 'StartupMeu Reviewer',
        order: 1,
        creator: demoUser._id
      },

      // Done Column
      {
        title: '1-Click Demo Reviewer Authentication',
        description: 'Provide instant zero-friction login for hiring evaluators with pre-configured admin permissions.',
        status: 'done',
        priority: 'urgent',
        tags: ['Auth', 'Hiring', 'Feature'],
        dueDate: pastDate(1),
        assignee: 'Mani Deep',
        order: 0,
        creator: devUser._id
      },
      {
        title: 'Vite & Tailwind CSS Theme Integration',
        description: 'Configure typography, responsive flex layouts, Linear-inspired color palette, and micro-interactions.',
        status: 'done',
        priority: 'medium',
        tags: ['Frontend', 'Tailwind'],
        dueDate: pastDate(2),
        assignee: 'Mani Deep',
        order: 1,
        creator: devUser._id
      },
      {
        title: 'Automated REST Integration Test Suite',
        description: 'Setup Jest & Supertest test harness validating auth routes, task creation, and error boundaries.',
        status: 'done',
        priority: 'high',
        tags: ['Testing', 'QA'],
        dueDate: pastDate(3),
        assignee: 'Mani Deep',
        order: 2,
        creator: devUser._id
      }
    ];

    const createdTasks = await Task.insertMany(tasksData);
    console.log(`✅ Seeded ${createdTasks.length} tasks across all 4 Kanban columns.`);

    console.log('📝 Seeding Activity Audit Logs...');
    const activitiesData = [
      {
        task: createdTasks[7]._id,
        taskTitle: createdTasks[7].title,
        user: devUser._id,
        userName: devUser.name,
        action: 'status_changed',
        details: 'Moved "1-Click Demo Reviewer Authentication" to [Done]',
        createdAt: pastDate(1)
      },
      {
        task: createdTasks[8]._id,
        taskTitle: createdTasks[8].title,
        user: devUser._id,
        userName: devUser.name,
        action: 'status_changed',
        details: 'Moved "Vite & Tailwind CSS Theme Integration" to [Done]',
        createdAt: pastDate(2)
      },
      {
        task: createdTasks[3]._id,
        taskTitle: createdTasks[3].title,
        user: devUser._id,
        userName: devUser.name,
        action: 'status_changed',
        details: 'Moved "Refactor Drag-and-Drop State Sync" from [To Do] to [In Progress]',
        createdAt: pastDate(1)
      },
      {
        task: createdTasks[0]._id,
        taskTitle: createdTasks[0].title,
        user: demoUser._id,
        userName: demoUser.name,
        action: 'created',
        details: 'Created task "Architect Webhook Ingestion Engine" in column [To Do]',
        createdAt: pastDate(2)
      },
      {
        task: createdTasks[5]._id,
        taskTitle: createdTasks[5].title,
        user: devUser._id,
        userName: devUser.name,
        action: 'status_changed',
        details: 'Moved "Mongoose Compound Indexes Optimization" to [In Review]',
        createdAt: pastDate(1)
      }
    ];

    await ActivityLog.insertMany(activitiesData);
    console.log(`✅ Seeded ${activitiesData.length} activity audit logs.`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Credentials for Testing:');
    console.log('👉 Demo Reviewer: demo@devpulse.io / Password123!');
    console.log('👉 Developer:     manideep@devpulse.io / Password123!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
