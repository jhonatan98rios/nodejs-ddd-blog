
export interface ISendMail {
  from: string,
  to: string
  body: string
  subject: string
}

export abstract class AbstractMailProvider {
  abstract sendMail(props: ISendMail): Promise<void>

}