"use server";

import { addPublishedPost, updateArticleStatus } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function hideArticleAction(formData: FormData) {
  const articleId = Number(formData.get("articleId"));
  if (isNaN(articleId)) {
    throw new Error("Invalid article ID");
  }

  await updateArticleStatus(articleId, "hidden");

  revalidatePath("/admin/news");
}

export async function createPostAction(formData: FormData) {
  // Basic validation
  const rawArticleId = Number(formData.get("rawArticleId"));
  const commentary = formData.get("commentary") as string;
  const tag = formData.get("tag") as "国内" | "海外" | "規制" | "資金調達" | "技術"; // Assuming validation on client

  if (isNaN(rawArticleId) || !commentary || !tag) {
    throw new Error("Missing required fields");
  }

  // Data to be saved in PublishedPost
  const postData = {
    rawArticleId,
    title: formData.get("title") as string,
    url: formData.get("url") as string,
    sourceName: formData.get("sourceName") as string,
    commentary,
    tag,
  };

  await addPublishedPost(postData);

  // Revalidate the homepage and news page to show the new post
  revalidatePath("/");
  revalidatePath("/news");

  // Redirect back to the admin review page
  redirect("/admin/news");
}
