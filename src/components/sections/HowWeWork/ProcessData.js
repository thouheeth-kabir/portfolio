import { 
  Lightbulb, FileSearch, Palette, Rocket, 
  Calculator, Calendar, Monitor, CheckSquare, Server 
} from 'lucide-react';

// Process steps data with detailed information
const processSteps = [
  {
    id: 'consultation',
    title: 'Consultation',
    shortTitle: '1st',
    icon: <Lightbulb className="w-6 h-6" />,
    color: '#4A7BF7', // Blue
    description: 'We begin by understanding your vision, goals, and business needs through in-depth discussions with your team. This collaborative phase helps us align our approach with your expectations and sets the foundation for the entire project.',
  },
  {
    id: 'research',
    title: 'Research',
    shortTitle: '2nd',
    icon: <FileSearch className="w-6 h-6" />,
    color: '#69B7F8', // Light Blue
    description: 'We document detailed functional and technical requirements, while evaluating technical challenges and feasibility. Our team prepares a comprehensive project quote based on the scope and complexity, ensuring transparency from the start.',
  },
  {
    id: 'design',
    title: 'Design',
    shortTitle: '3rd',
    icon: <Palette className="w-6 h-6" />,
    color: '#F97451', // Orange
    description: 'Our designers create intuitive, engaging interfaces and interactive prototypes for your feedback. We follow an iterative approach, refining the design based on your input until we achieve the perfect balance of aesthetics and usability.',
  },
  {
    id: 'development',
    title: 'Development',
    shortTitle: '4th',
    icon: <Monitor className="w-6 h-6" />,
    color: '#F5A962', // Light Orange
    description: 'Our engineers build your solution using modern technologies with regular code reviews and quality checks. We follow agile methodologies with frequent deliverables, allowing you to see progress and provide feedback throughout the development cycle.',
  },
  {
    id: 'testing',
    title: 'Testing',
    shortTitle: '5th',
    icon: <CheckSquare className="w-6 h-6" />,
    color: '#8B5CF6', // Purple
    description: 'We perform rigorous testing across devices and scenarios to ensure your product is reliable, secure, and performs excellently. This includes functional testing, performance optimization, and security assessments to deliver a robust final product.',
  },
  {
    id: 'launch',
    title: 'Launch',
    shortTitle: '6th',
    icon: <Rocket className="w-6 h-6" />,
    color: '#F59E0B', // Amber
    description: 'After carefully deploying your solution, we provide ongoing support, monitor performance, and work with you on future enhancements. Our relationship continues beyond launch as we help you grow and evolve your digital product over time.',
  }
];

export default processSteps;