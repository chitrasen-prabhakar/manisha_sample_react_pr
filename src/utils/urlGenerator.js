const urlGenerator = {
  campaignToolEditLink: function (id) {
    return `/campaign-tool/edit/${id}`;
  },
  campaignToolEditDir: function () {
    return "/campaign-tool/edit/[id]";
  },
};

export default urlGenerator;
