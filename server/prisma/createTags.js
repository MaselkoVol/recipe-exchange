const prisma = require("../src/prismaClient");

const tagCategories = [
  [
    { name: "Тип їжі", id: "" },
    ["Сніданок", "Обід", "Вечеря", "Перекус", "Десерт", "Закуска", "Гарнір"],
  ],
  [
    { name: "Дієтичні уподобання", id: "" },
    [
      "Вегетаріанська",
      "Веганська",
      "Без глютену",
      "Без молочних продуктів",
      "Низьковуглеводна",
      "Палео",
      "Кето",
    ],
  ],
  [
    { name: "Методи приготування", id: "" },
    ["Запікання", "Гриль", "Смаження", "Варіння на пару", "Варіння"],
  ],
  [{ name: "Подія", id: "" }, ["Свято", "Вечірка", "Особлива подія"]],
];

async function createTagCategories() {
  await prisma.recipeTag.deleteMany();
  await prisma.recipeTagCategory.deleteMany();
  for (let i = 0; i < tagCategories.length; i++) {
    const tagCategory = await prisma.recipeTagCategory.create({
      data: { name: tagCategories[i][0].name },
    });
    tagCategories[i][0].id = tagCategory.id;
  }
  for (let i = 0; i < tagCategories.length; i++) {
    await prisma.recipeTag.createMany({
      data: tagCategories[i][1].map((category) => ({
        name: category,
        tagCategoryId: tagCategories[i][0].id,
      })),
    });
  }
}

createTagCategories();
