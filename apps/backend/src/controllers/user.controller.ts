import { Request, Response } from "express";
import { prisma } from "@convoai/db/prisma";

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const data = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        subscription: true,
        integrations: {
          select: {
            id: true,
            token: true,
            expiresAt: true,
            name: true,
          },
        },
      },
    });

    if (!data) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const updateInstaToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { refreshToken, expiresAt, integrationId } = req.body;

    if (!refreshToken || !expiresAt || !integrationId) {
      res.status(400).json({
        error:
          "Missing required fields: refreshToken, expiresAt, integrationId",
      });
      return;
    }

    const existingIntegration = await prisma.integrations.findFirst({
      where: {
        id: integrationId,
      },
    });

    if (!existingIntegration || existingIntegration.userId !== user.id) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    const updatedIntegration = await prisma.integrations.update({
      where: {
        id: integrationId,
      },
      data: {
        token: refreshToken,
        expiresAt: expiresAt,
      },
    });

    res.status(200).json({
      message: "Token updated successfully",
      integration: updatedIntegration,
    });
    return;
  } catch (error) {
    console.error("Error updating Instagram token:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const enableAutomation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        automations: {
          create: {},
        },
      },
    });

    res.status(200).json({ success: true });
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getAutomation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const automationDate = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        automations: {
          orderBy: { createdAt: "asc" },
          include: {
            keywords: true,
            listener: true,
          },
        },
      },
    });

    if (!automationDate) {
      res.status(404).json({ error: "Automation not found" });
      return;
    }

    res.status(200).json({ automation: automationDate });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getAutomationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    const automationId = req.params.id;

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const automation = await prisma.automation.findUnique({
      where: { id: automationId },
      include: {
        keywords: true,
        listener: true,
        trigger: true,
        dms: true,
        posts: true,
      },
    });

    if (!automation || automation.userId !== user.id) {
      res.status(404).json({ error: "Automation not found" });
      return;
    }

    res.status(200).json({ automation });
    return;
  } catch (error) {
    console.error("Error getting automation by ID:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const updateAutomation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    const automationId = req.params.id;

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!automationId) {
      res.status(400).json({ error: "Automation ID is required" });
      return;
    }

    const automation = await prisma.automation.findUnique({
      where: { id: automationId },
    });

    if (!automation || automation.userId !== user.id) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    const { name, active, trigger, listener, keywords, dms, posts } = req.body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (active !== undefined) updateData.active = active;

    // Handle nested relations properly
    if (trigger !== undefined && Array.isArray(trigger)) {
      updateData.trigger = {
        create: trigger.map((t) => ({ type: t.type })),
      };
    }

    if (keywords !== undefined && Array.isArray(keywords)) {
      updateData.keywords = {
        create: keywords.map((k) => ({ word: k.word })),
      };
    }

    if (listener !== undefined && Array.isArray(listener)) {
      updateData.listener = {
        create: listener.map((l) => ({
          listener: l.listener,
          prompt: l.prompt || null,
          commentReply: l.commentReply || null,
        })),
      };
    }
    if (dms !== undefined) updateData.dms = dms;
    if (posts !== undefined) updateData.posts = posts;

    const updatedAutomation = await prisma.automation.update({
      where: { id: automationId },
      data: updateData,
      include: {
        keywords: true,
        listener: true,
        trigger: true,
        dms: true,
        posts: true,
      },
    });

    res.status(200).json({ automation: updatedAutomation });
    return;
  } catch (error) {
    console.error("Error updating automation:", error);
    res.status(500).json({ error: "Internal server error", details: error });
    return;
  }
};
