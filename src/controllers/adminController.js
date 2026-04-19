import prisma from "../config/prisma.js";

export const getAllInterns = async (req, res) => {
  try {
    const interns = await prisma.user.findMany({
      where: {
        role: "INTERN"
      }
    });

    res.json(interns);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const approveIntern = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.update({
      where: { id },
      data: { status: "APPROVED" }
    });

    res.json({ message: "Intern approved" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectIntern = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.update({
      where: { id },
      data: { status: "REJECTED" }
    });

    res.json({ message: "Intern rejected" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
