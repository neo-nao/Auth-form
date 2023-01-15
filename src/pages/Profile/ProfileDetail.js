import { ProfileDetailSection } from "./ProfileStyles.styled";
import SkeletonElement from "../../components/common/SkeletonElement/SkeletonElement";

const tableDatas = [
  { id: 1, placeholder: "Name", reference: "name" },
  { id: 2, placeholder: "Last name", reference: "lastName" },
  { id: 3, placeholder: "Email", reference: "displayEmail" },
  { id: 4, placeholder: "Number", reference: "number" },
  { id: 5, placeholder: "Password", reference: "password" },
];

const ProfileDetail = ({ userAccount }) => {
  const userAccLength = Object.keys(userAccount).length;

  const renderTableDatas = () => {
    let fillIndex = 0;
    let createdTag = [];
    let cellTags = [];
    for (let i = 0; i < tableDatas.length; i++) {
      const cellTag = (
        <td key={tableDatas[i].id}>
          <span className="cell-caption">{tableDatas[i].placeholder} :</span>
          {userAccLength ? (
            <p>{userAccount[tableDatas[i].reference] || "Empty"}</p>
          ) : (
            <SkeletonElement width="100%" />
          )}
        </td>
      );

      const trTag = <tr key={createdTag.length}>{cellTags}</tr>;
      cellTags.push(cellTag);
      fillIndex++;

      if (fillIndex === 2 || i === tableDatas.length - 1) {
        createdTag.push(trTag);
      }
      if (fillIndex === 2) {
        cellTags = [];
        fillIndex = 0;
      }
    }
    return createdTag;
  };

  return (
    <ProfileDetailSection>
      <table>
        <tbody>{renderTableDatas()}</tbody>
      </table>
      <SkeletonElement />
    </ProfileDetailSection>
  );
};

export default ProfileDetail;
