interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "TypeScript Support",
    description: "Built-in TypeScript support for better development experience and type safety.",
    icon: "🔧"
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development with beautiful designs.",
    icon: "🎨"
  },
  {
    title: "Next.js App Router",
    description: "Modern routing system with server components and improved performance.",
    icon: "⚡"
  },
  {
    title: "ESLint Ready",
    description: "Pre-configured ESLint for code quality and consistency across your project.",
    icon: "✅"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose This Stack?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern technologies working together to create amazing web experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
