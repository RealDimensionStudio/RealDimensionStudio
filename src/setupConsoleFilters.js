if (import.meta.env.DEV) {
  const ignoredConsoleMessages = [
    "Download the React DevTools for a better development experience",
    "THREE.THREE.Clock: This module has been deprecated",
  ];

  const shouldIgnore = (args) =>
    args.some((arg) => ignoredConsoleMessages.some((message) => String(arg).includes(message)));

  const originalInfo = console.info;
  const originalWarn = console.warn;

  console.info = (...args) => {
    if (!shouldIgnore(args)) originalInfo(...args);
  };

  console.warn = (...args) => {
    if (!shouldIgnore(args)) originalWarn(...args);
  };
}
