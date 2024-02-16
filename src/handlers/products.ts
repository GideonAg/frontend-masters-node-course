import prisma from "../db";

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id,
      userId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated, status: "product updated" });
};

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  res.json({ data: deleted, status: "product deleted" });
};
