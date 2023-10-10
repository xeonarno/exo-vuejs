
interface Application {
    id: number;
    name: string;
    url: string;
    type: "SPA" | "MPA" | "SSR";
    description: string;
    date: string;
  }
  
  export default Application;