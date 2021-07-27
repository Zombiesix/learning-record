// 请求、响应的基础描述信息
module.exports = {
  // 请求
  baseRequest: {
    id: {
      type: "string",
      description: "id 唯一值",
      required: true,
      example: "1"
    }
  },
  // 响应
  baseResponse: {
    code: { type: "integer", required: true, example: 0 },
    data: { type: "string", example: "请求成功" },
    errorMessage: { type: "string", example: "请求成功" }
  }
}
