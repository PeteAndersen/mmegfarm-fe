import api from "@/services/api";

async function getCreature(id) {
  return await api.get(`creatures/${id}/`);
}

export default {
  getCreature
};
