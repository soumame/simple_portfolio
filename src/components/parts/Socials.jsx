import {
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Mail,
  Coffee,
  Youtube,
  Bitcoin,
} from "lucide-react";
const Socials = (props) => {
  const components = {
    Twitter: Twitter,
    Instagram: Instagram,
    Github: Github,
    Linkedin: Linkedin,
    Mail: Mail,
    Coffee: Coffee,
    Youtube: Youtube,
    Bitcoin: Bitcoin,
    // アイコンのこんぽーねんとついか
  };
  const IconComponent = components[props.icon];
  if (!IconComponent) {
    return <div>Icon not found</div>;
  }
  return <IconComponent title={props.title} />;
};

export default Socials;
