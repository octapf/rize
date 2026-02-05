module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Enforced strict palette
        background: '#262626',
        text: '#E3E3E3', 
        primary: '#9D12DE', // Purple
        highlight: '#FFEA00', // Yellow (Accent)
        
        // Semantic mappings for compatibility
        surface: '#262626',
        accent: '#FFEA00', 
        
        // Glass utilities (kept for structural needs, using white/black alpha)
        glass: {
          10: 'rgba(255, 255, 255, 0.1)',
          20: 'rgba(255, 255, 255, 0.2)',
          30: 'rgba(255, 255, 255, 0.3)',
        },
      },
      fontFamily: {
        // Updated Typography System
        // Poppins (Headings) - Replaces Barlow
        'heading': ['Poppins_700Bold'], 
        'heading-bold': ['Poppins_700Bold'],
        'heading-semibold': ['Poppins_600SemiBold'], 
        'barlow-bold': ['Poppins_700Bold'], // Alias for existing usage
        
        // Inter (Body) - Stays Inter but uses Google Font
        'body': ['Inter_400Regular'],
        'body-medium': ['Inter_500Medium'],
        'body-semibold': ['Inter_600SemiBold'],
        'inter-regular': ['Inter_400Regular'], // Alias
        'inter-medium': ['Inter_500Medium'],   // Alias
        'inter-semibold': ['Inter_600SemiBold'], // Alias
        'inter-bold': ['Inter_600SemiBold'], // Alias (mapped to Semibold as loaded)

        // Montserrat (Accents/Labels) - New
        'label': ['Montserrat_500Medium'],
        'label-bold': ['Montserrat_600SemiBold'],
        'barlow-medium': ['Montserrat_500Medium'], // Alias fallback
        'barlow-semibold': ['Montserrat_600SemiBold'], // Alias fallback
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
