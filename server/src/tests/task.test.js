const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');

let authToken;
let createdTaskId;

beforeAll(async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devpulse_test';
  await mongoose.connect(mongoUri);

  // Authenticate as demo user to obtain valid JWT
  const res = await request(app).post('/api/auth/demo-login');
  authToken = res.body.token;
});

afterAll(async () => {
  if (createdTaskId) {
    await Task.findByIdAndDelete(createdTaskId);
  }
  await mongoose.connection.close();
});

describe('Task and Board REST Endpoints', () => {
  it('GET /api/tasks should return list of tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/tasks should create a new task with validation', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Integration Test Task',
        description: 'Verifying end-to-end task creation via Supertest',
        status: 'todo',
        priority: 'high',
        tags: ['Testing', 'Jest']
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Integration Test Task');
    expect(res.body.data.priority).toBe('high');
    createdTaskId = res.body.data._id;
  });

  it('PATCH /api/tasks/:id/status should update column status', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${createdTaskId}/status`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        status: 'in_progress'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('in_progress');
  });

  it('GET /api/tasks with ?status=in_progress should filter accordingly', async () => {
    const res = await request(app)
      .get('/api/tasks?status=in_progress')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    res.body.data.forEach((task) => {
      expect(task.status).toBe('in_progress');
    });
  });

  it('GET /api/activities should return recorded audit logs', async () => {
    const res = await request(app)
      .get('/api/activities')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('DELETE /api/tasks/:id should delete task and record activity', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
