interface LeadData {
  name: string
  price: number
  status: StatusData
  responsible_user_name: string
  contacts: ContactData[]
  created_at: string
}

interface StatusData {
  name: string
  color: string
}

interface ContactData {
  name: string
}
