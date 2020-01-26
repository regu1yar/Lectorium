Hello, Lectorium!

Quick way:
1. Build frontend `npm run build` (_copies build to maven target dir inside backend_)
2. Build & run backend `mvn spring-boot:run -pl backend`

Other way:
1. Build frontend `npm run build`
2. Compile & package backend `mvn package`
3. Run backend `java -jar backend/target/lectorium-dashboard-1.0-SNAPSHOT.jar`