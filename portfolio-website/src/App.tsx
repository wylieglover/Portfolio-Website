// App.tsx or your page component
import AnimatedWebsite from './components/AnimatedWebsite';
import myProjects from './components/AnimatedProjects/myProjects';

const App = () => {
  return (
    <AnimatedWebsite
      name="Wylie Glover"
      title="Software Engineer & Website Designer | Recent graduate | Nvidia certified associate with AI/LLMs"
      projects={myProjects}
    />
  );
};

export default App;