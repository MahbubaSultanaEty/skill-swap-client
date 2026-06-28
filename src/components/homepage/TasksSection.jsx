import React from 'react'; 
import Link from 'next/link';
import TaskCard from '../tasks/TaskCard';
import { getTasks } from '@/lib/api/task';

const TasksSection = async() => {
    const {tasks} = await getTasks();
    
  const recentTasks = tasks.slice(0, 6); 

  return (
    <section className="bg-[#f8faf8] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#dcfce7] text-[#15803d] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-3">
            Open Opportunities
          </span>
          <h2 className="text-3xl font-bold text-[#0f172a] sm:text-4xl tracking-tight">
            Explore Latest Tasks & Projects
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-[#64748b]">
            Find projects that match your expertise and start collaborating today.
          </p>
        </div>

        {/* 6-Card  Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTasks.map((task) => (
            
            <TaskCard key={task._id} task={task} />
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/tasks"
            className="inline-flex items-center justify-center px-6 py-3 border border-[#0f172a] text-base font-medium rounded-md text-[#92400e] bg-transparent hover:bg-[#15803d] hover:border-none hover:text-white transition-colors duration-200"
          >
            Browse All Tasks &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TasksSection;