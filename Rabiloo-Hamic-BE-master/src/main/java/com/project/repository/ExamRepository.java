package com.project.repository;

import com.project.entity.ExamEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<ExamEntity, Long>{

    @EntityGraph(attributePaths = {"questions", "questions.answers"})
    ExamEntity findDistinctByIdAndCodeNullAndDeletedFalse(Long id);

    //@EntityGraph(attributePaths = {"questions", "questions.answers"})
    @Query(value = "select * from exam " +
            "where exam.code is null" +
            " and exam.deleted = false " +
            " order by exam.modified_date desc;",nativeQuery = true)
    List<ExamEntity> findByCodeNullAndDeletedFalse();


    @EntityGraph(attributePaths = {"questions", "questions.answers"})
    ExamEntity findByIdAndCodeNotNullAndDeletedFalse(Long id);

    //@EntityGraph(attributePaths = {"questions", "questions.answers"})
    List<ExamEntity> findByCodeNotNullAndDeletedFalse();

    @EntityGraph(attributePaths = {"questions", "questions.answers"})
    ExamEntity findByIdAndDeletedFalse(Long id);

    //@EntityGraph(attributePaths = {"questions", "questions.answers"})
    @Query(value = "select new ExamEntity(" +
            "e.id," +
            "e.title," +
            "e.description," +
            "e.type," +
            "e.code," +
            "e.startFrom," +
            "e.endTo," +
            "e.modifiedDate,"+
            "e.createdDate," +
            "e.totalTime"+
            ")"+
            "from ExamEntity e " +
            "where e.deleted = false " +
            "order by e.createdDate desc")
    List<ExamEntity> findByDeletedFalse();


    @Query(value =
            "select * from exam as ex " +
            "where (:title is null or ex.title like :title) " +
            "and (:code is null or ex.code like :code) " +
            "and (:startTime is null or ex.start_from >= :startTime) " +
            "and (:endTime is null or ex.end_to <= :endTime)"+
            "and ex.deleted = false",nativeQuery = true
    )
    List<ExamEntity> findExamsByParamNative(String code, String title, String startTime,String endTime);

    Page<ExamEntity> findByDeletedFalse(Pageable pageable);

}
