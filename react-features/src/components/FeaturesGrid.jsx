import { FiLayers, FiZap } from 'react-icons/fi';
import { MdApi, MdSpeed, MdOutlineTune } from 'react-icons/md';
import FeatureCard from './FeatureCard';

const features = [
    {
        icon: FiLayers,
        title: 'Transition Demo',
        description: 'Demonstration of React 19 useTransition to improve UI responsiveness during heavy updates by deferring non-urgent updates.',
        link: '/useTransition-19',
        color: 'indigo-600'
    },
    {
        icon: FiZap,
        title: 'Effect Demo',
        description: 'Learn about useEffect and side effects in enterprise apps.',
        link: '/effect-demo',
        color: 'purple-600'
    },
    {
        icon: MdOutlineTune,
        title: 'Product Filter',
        description: 'Filter products by category, price, and rating with advanced UI.',
        link: '/product-filter',
        color: 'pink-500'
    },
    {
        icon: MdApi,
        title: 'Parallel API',
        description: 'Star Wars API with Promise.all and React Query.',
        link: '/parallel-api',
        color: 'yellow-500'
    },
    {
        icon: MdSpeed,
        title: 'Debounce & Throttle',
        description: 'Learn how to implement debounce and throttle in React applications.',
        link: '/debounce-throttle',
        color: 'teal-500'
    }
];

function FeaturesGrid() {
  return (
    <div className="max-w-5xl w-full mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}

export default FeaturesGrid;