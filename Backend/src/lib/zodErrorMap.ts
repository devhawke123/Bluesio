import { z } from "zod";

// Replaces Zod's technical messages with user-friendly ones globally.
z.config({
  customError: (issue) => {
    switch (issue.code) {
      case "invalid_type":
        return issue.input === undefined ? "This field is required" : "Invalid value";
      case "too_small":
        return "Value is too short or too small";
      case "too_big":
        return "Value is too long or too large";
      case "invalid_format":
        return "Invalid format";
      default:
        return undefined;
    }
  },
});
