export interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
}

export interface FamilyDict {
  [id: string]: FamilyMember;
}
