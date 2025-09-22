import ClimateImages from "../climate-condition.json";

export default function Main() {
  return (
    <main id="Main">
      <Main1 />
      <Main2 />
    </main>
  );
}
function Main1() {
  return (
    <section id="m-1-location-forecast">
      <Main1MainData />
      <Main1ComplementaryData />
    </section>
  );
}
function Main1MainData() {
  return (
    <div className="m-1-container">
      <M_1_MD_1 />
      <M_1_MD_2 />
    </div>
  );
}
function M_1_MD_1() {
  return (
    <header>
      <h3 className="m-1-location-name">Location</h3>
      <p>Date</p>
    </header>
  );
}
function M_1_MD_2() {
  return (
    <div className="m-1-container-data" role="complementary">
      <img
        width={100}
        src={ClimateImages[7]?.image}
        alt={ClimateImages[7]?.alt}
      />
      <span className="m-1-data-number">NUM</span>
    </div>
  );
}
function Main1ComplementaryData() {
  return (
    <ul id="m-1-list" role="group">
      <M_1_Data />
      <M_1_Data />
      <M_1_Data />
      <M_1_Data />
    </ul>
  );
}
function M_1_Data() {
  return (
    <li className="m-1-data generalBorder generalBackground">
      <span>[TITLE]</span> <span>[DATA]</span>
    </li>
  );
}
function Main2() {
  return (
    <section id="m-2-daily-forecast">
      <h3>Daily forecast</h3>
      <Main2List />
    </section>
  );
}
function Main2List() {
  return (
    <ul id="m-2-list" role="group">
      <M_2_LI />
      <M_2_LI />
      <M_2_LI />
      <M_2_LI />
      <M_2_LI />
      <M_2_LI />
      <M_2_LI />
    </ul>
  );
}
function M_2_LI() {
  return (
    <li className="m-2-data generalBorder generalBackground">
      [DAY] <figure>[IMAGE]</figure>
      <span className="m-2-min-max">[MIN] [MAX]</span>
    </li>
  );
}
