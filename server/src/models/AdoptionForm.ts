export interface AdoptionForm {
  id: number;
  user_id: number;
  user_name: string;
  user_address: string;
  user_phone: string;
  user_email: string;
  pet_id: number;
  pet_name: string;
  pet_type: string;
  pet_breed: string;
  pet_age: number;
  reason: string;
  status: string;
  submitted_at: Date;
}
