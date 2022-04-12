module.exports = {
  root: true,
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: "./renderer",
    },
  },
  ignorePatterns: ["dist", "main", "node_modules"],
};
