import { getFreelancers } from '@/lib/actions/freelancer';
import FreelancerCard from '../freelancers/FreelancerCard';

export default async function FeaturedFreelancers() {
    const freelancers = await getFreelancers();
    const featuredFreelancers = freelancers.slice(0, 6);
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* সেকশন হেডার */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Top Rated Freelancers
          </h2>
          <p className="text-gray-600">
            Explore our most talented and highly reviewed professionals
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFreelancers.map((freelancer) => (
              <FreelancerCard
              freelancer={freelancer}
              key={freelancer._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}