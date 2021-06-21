module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "prismjs",
      {
        languages: [
          "javascript",
          "typescript",
          "c",
          "cpp",
          "html",
          "css",
          "cypher",
          "sql",
          "bash",
          "csharp",
          "dart",
          "diff",
          "docker",
          "go",
          "graphql",
          "java",
          "json",
          "latex",
          "python",
          "ruby"
        ],
        plugins: ["line-numbers"],
        theme: "okaidia",
        css: true
      }
    ]
  ]
};
