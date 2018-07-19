import api from "@/services/api";

async function fetchDungeon(id) {
  return await api.get(`dungeons/${id}/`);
}

async function fetchDungeons(params) {
  return await api.get("dungeons/", { params });
}

async function fetchLevel(id) {
  return await api.get(`levels/${id}/`);
}

export default {
  fetchDungeon,
  fetchDungeons,
  fetchLevel
};
