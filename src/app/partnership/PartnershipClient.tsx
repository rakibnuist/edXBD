'use client';

import { motion } from 'framer-motion';
import { 
  Handshake, 
  Users, 
  TrendingUp, 
  Award, 
  Globe, 
  Shield, 
  BookOpen, 
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Briefcase,
  Headphones,
  Zap
} from 'lucide-react';

const PartnershipClient = () => {

  const partnershipTypes = [
    {
      title: 'Authorized Agent',
      description: 'Become our authorized agent and represent EduExpress International in your region',
      features: [
        'Exclusive territory rights',
        'Comprehensive training program',
        'Marketing materials and support',
        'Competitive commission structure',
        'Regular performance bonuses'
      ],
      icon: Shield,
      color: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Strategic Partner',
      description: 'Long-term strategic partnership for established education consultancies',
      features: [
        'Joint marketing initiatives',
        'Shared resources and expertise',
        'Customized partnership terms',
        'Priority support and training',
        'Revenue sharing opportunities'
      ],
      icon: Handshake,
      color: 'from-purple-500 to-purple-700'
    },
    {
      title: 'Referral Partner',
      description: 'Simple referral program for individuals and small businesses',
      features: [
        'Easy referral process',
        'Attractive referral fees',
        'No upfront investment',
        'Flexible working arrangements',
        'Quick payout system'
      ],
      icon: Users,
      color: 'from-green-500 to-green-700'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Revenue Growth',
      description: 'Increase your revenue with our proven study abroad programs and competitive commission structure'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Access our extensive network of universities and institutions worldwide'
    },
    {
      icon: BookOpen,
      title: 'Training & Support',
      description: 'Comprehensive training programs and ongoing support to ensure your success'
    },
    {
      icon: Award,
      title: 'Brand Recognition',
      description: 'Leverage our established brand and reputation in the education industry'
    },
    {
      icon: Target,
      title: 'Marketing Support',
      description: 'Professional marketing materials, digital campaigns, and lead generation support'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock support for you and your students throughout the application process'
    }
  ];

  const requirements = [
    'Valid business license and registration',
    'Minimum 2 years experience in education consultancy',
    'Strong local network and market presence',
    'Commitment to ethical business practices',
    'Ability to provide excellent customer service',
    'Basic understanding of international education systems'
  ];

  const process = [
    {
      step: 1,
      title: 'Application',
      description: 'Submit your partnership application with required documents'
    },
    {
      step: 2,
      title: 'Evaluation',
      description: 'Our team reviews your application and conducts initial assessment'
    },
    {
      step: 3,
      title: 'Interview',
      description: 'Virtual interview to discuss partnership terms and expectations'
    },
    {
      step: 4,
      title: 'Training',
      description: 'Comprehensive training program on our services and processes'
    },
    {
      step: 5,
      title: 'Launch',
      description: 'Official partnership launch with marketing support and materials'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Handshake className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Be Our <span className="text-yellow-300">Partner</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Join EduExpress International and expand your education consultancy business with our comprehensive study abroad solutions
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 rounded-full text-lg transition-colors"
              >
                Download Brochure
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Partnership <span className="text-blue-600">Opportunities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the partnership model that best fits your business goals and market position
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                    {type.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {type.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {type.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Why Partner With <span className="text-blue-600">Us?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of successful partners who have grown their business with EduExpress International
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Process */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8">
                Partnership <span className="text-blue-600">Requirements</span>
              </h2>
              
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Process */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8">
                Application <span className="text-blue-600">Process</span>
              </h2>
              
              <div className="space-y-6">
                {process.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Ready to Start Your <span className="text-yellow-300">Partnership Journey?</span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join EduExpress International today and take your education consultancy business to the next level
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Briefcase className="w-5 h-5" />
                <span>Apply for Partnership</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 rounded-full text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Headphones className="w-5 h-5" />
                <span>Schedule Consultation</span>
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100"
            >
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>500+ Active Partners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-300" />
                <span>Industry Leader</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipClient;
