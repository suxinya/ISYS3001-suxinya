// frontend/src/components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onTaskSubmit }) => {
  const [formData, setFormData] = useState({
    taskTitle: '',
    taskDescription: '', 
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.taskTitle.trim()) {
      newErrors.taskTitle = '任务标题不能为空';
    }
    if (formData.dueDate && isNaN(new Date(formData.dueDate).getTime())) {
      newErrors.dueDate = '请选择有效的截止日期';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (validateForm()) {
      const newTask = {
        id: Date.now(), 
        title: formData.taskTitle.trim(),
        description: formData.taskDescription.trim(),
        dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
        status: 'pending' 
      };
      onTaskSubmit(newTask);
      setFormData({
        taskTitle: '',
        taskDescription: '',
        dueDate: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      maxWidth: '500px', 
      margin: '20px auto', 
      padding: '20px', 
      border: '1px solid #eee', 
      borderRadius: '8px' 
    }}>
      {/* 任务标题输入框 */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="taskTitle" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          任务标题 <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          id="taskTitle"
          name="taskTitle"
          value={formData.taskTitle}
          onChange={handleInputChange}
          style={{ 
            width: '100%', 
            padding: '8px', 
            border: errors.taskTitle ? '1px solid red' : '1px solid #ddd',
            borderRadius: '4px' 
          }}
          placeholder="请输入任务标题（如：完成A2作业）"
        />
        {/* 错误提示 */}
        {errors.taskTitle && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '12px' }}>{errors.taskTitle}</p >}
      </div>

      {/* 任务描述输入框 */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="taskDescription" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          任务描述
        </label>
        <textarea
          id="taskDescription"
          name="taskDescription"
          value={formData.taskDescription}
          onChange={handleInputChange}
          style={{ 
            width: '100%', 
            padding: '8px', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            minHeight: '80px',
            resize: 'vertical'
          }}
          placeholder="请输入任务详情（可选）"
        />
      </div>

      {/* 截止日期选择器 */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="dueDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          截止日期
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          style={{ 
            padding: '8px', 
            border: errors.dueDate ? '1px solid red' : '1px solid #ddd',
            borderRadius: '4px' 
          }}
        />
        {errors.dueDate && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '12px' }}>{errors.dueDate}</p >}
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}
      >
        创建任务
      </button>
    </form>
  );
};

export default TaskForm;
