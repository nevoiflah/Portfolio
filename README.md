# Portfolio Website

A modern, immersive 3D portfolio website built with React and Three.js. This project features a unique "Warp Tunnel" scroll experience, where users fly through a neural network of data, creating a sense of infinite depth.

## Features

### 3D Infinite Neural Network
- **Dynamic Environment**: A deep 3D field of silver nodes and connections that responds to user interaction.
- **Curved Path**: The camera follows a Catmull-Rom spline curve, creating an organic "on rails" flight path instead of a linear movement.
- **Living Data**: Nodes pulse and breathe independently, while a secondary starfield layer of 2000 particles adds depth and speed.
- **Atmospheric Fog**: Custom fog implementation smoothly blends distant elements into the void.

### Advanced Scroll System ("Warp Tunnel")
- **Z-Axis Navigation**: Unlike traditional vertical scrolling, the desktop layout is built on the Z-axis. As users scroll, sections scale up and fade out, ensuring the user literally "flies through" the content.
- **Momentum Scrolling**: Integrated `Lenis` for smooth, inertial scrolling effects.
- **Scroll-Linked Animations**: Camera position, rotation, and color shifts are tightly coupled to scroll progress using Framer Motion and React Three Fiber.

### Interactive Elements
- **Magnetic Profile**: The Hero section features a physics-based magnetic profile picture that tracks the mouse cursor using spring animations.
- **Smart Navigation**: Programmatic scrolling logic detects the target layout (Desktop vs. Mobile) and routes the user to the correct coordinate or DOM element.
- **Hover Effects**: Glassmorphic cards and interactive buttons respond to user input with subtle elevation and lighting changes.

### Mobile Optimization
- **Hybrid Engine**: The site detects the device type and hot-swaps the layout engine.
    - **Desktop**: Renders the 500vh "Warp Tunnel" Z-stack.
    - **Mobile**: Renders a standard vertical stack for native feel and usability on small screens.

## Technical Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── 3d/
│   │   └── GeometricNetwork.jsx   # The 3D Neural Network engine
│   ├── Hero.jsx                   # Introduction section
│   ├── About.jsx                  # About Me section
│   ├── Skills.jsx                 # Technical skills grid
│   ├── Projects.jsx               # Project showcase
│   ├── Contact.jsx                # Contact methods
│   ├── ZSection.jsx               # Wrapper for "Fly-Through" logic
│   └── MagneticWrapper.jsx        # Physics-based mouse interaction
├── hooks/
│   └── useIsMobile.js             # Layout detection hook
├── App.jsx                        # Main layout & scroll logic
└── main.jsx                       # Entry point
```

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Development Notes

- The 3D scene is rendered on a fixed background canvas with `z-index: -10`.
- Desktop scrolling works by creating a ghost height of `500vh` and mapping scroll progress (0.0 to 1.0) to Z-axis transforms.
- Mobile scrolling disables the 3D transforms and relies on standard CSS positioning for better performance and touch responsiveness.

## License

This project is open source and available for personal and educational use.
