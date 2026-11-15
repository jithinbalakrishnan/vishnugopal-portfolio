/**
 * Runs before first paint so a returning visitor who chose a theme never sees
 * the other one flash. With no stored choice it does nothing and the
 * prefers-color-scheme rules in globals.css decide.
 */
const script = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
