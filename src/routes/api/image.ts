import type { RequestHandler } from "@sveltejs/kit";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export const get: RequestHandler = async ({ url }) => {
  const imageFilename = url.searchParams.get("name");
  if (imageFilename === null) {
    return {
      status: 404,
      body: "Image name not provided"
    };
  }
  console.log(imageFilename);

  try {
    const image = await fs.promises.readFile(
      __dirname + `/src/assets/images/${imageFilename.replace(":", "/")}`
    );
    return {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg"
      },
      body: image
    };
  } catch (error) {
    console.log(error);
    return {
      status: 404,
      body: "Image not found"
    };
  }
};
