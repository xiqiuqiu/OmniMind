export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 尝试获取静态资源
    // ASSETS binding 由 wrangler.jsonc 中的 assets 配置自动提供
    let response = await env.ASSETS.fetch(request);

    // SPA 前端路由回退：
    // 如果资源不存在(404)且不是 API 请求，则返回 index.html
    if (response.status === 404 && !url.pathname.startsWith("/api/")) {
      return await env.ASSETS.fetch(
        new Request(new URL("/index.html", request.url), request),
      );
    }

    return response;
  },
};
