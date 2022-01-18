import requset from "../utils/request"

export class CalendarService {
  static async listCalendar(): Promise<any> {
    return requset.get("/api/cov/calendar")
  }
  static async retrieveACalendar({ id }: any): Promise<any> {
    return requset.get(`/api/cov/calendar/${id}`)
  }
  static async deleteACalendar({ id }: any): Promise<any> {
    return requset.delete(`/api/cov/calendar/${id}`)
  }
  static async updateACalendar(params: any): Promise<any> {
    const id = params.id
    delete params.id
    return requset.patch(`/api/cov/calendar/${id}`,params)
  }
  static async createACalendar(params: any): Promise<any> {
    return requset.post(`/api/cov/calendar`, params)
  }
}
