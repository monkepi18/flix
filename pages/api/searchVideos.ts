import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function searchVideos(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { searchTerm } = req.query;
  try {
    const movies = await prismadb.movie.findMany({
      where: {
        title: {
          contains: searchTerm as string,
          mode: "insensitive",
        },
      },
    });

    const searchResults = movies.map((movie) => movie);

    res.status(200).json(searchResults);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching for videos." });
  } 
}