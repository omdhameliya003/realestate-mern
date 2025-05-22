const countweekmiddleware = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) - 6 (Saturday)

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
};
module.exports= countweekmiddleware;