import React from 'react';
import { App, createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx')
    ).then(module => {
      const Page = module.default;
      return (props: any) => (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={props.key || name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Page {...props} />
          </motion.div>
        </AnimatePresence>
      );
    }),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  }
});
